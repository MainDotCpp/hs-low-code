'use server';
import logger from '@/app/lib/logger';
import { mainDb } from '@/prisma/main-db';
import { convertQueryParams } from '@/app/lib/utils/table-util';

export const visitPage = async (params: any, sort: any, filter: any) => {
  logger.info('visitPage', params);
  logger.info('visitPage', sort);
  logger.info('visitPage', filter);
  const condition = convertQueryParams(params, sort, filter);
  const data = await mainDb.visitLog.findMany({
    take: params.pageSize,
    skip: (params.current - 1) * params.pageSize,
    ...condition,
    orderBy: {
      createAt: 'desc',
    },
  });
  const total = await mainDb.visitLog.count({
    ...condition,
  });
  return {
    data: data,
    success: true,
    total,
  };
};

export const getLineChartData = async (pageId: string) => {
  console.log(pageId);
  const reslt = await mainDb.$queryRawUnsafe(`
        WITH all_minutes AS (SELECT generate_series(
                                            (SELECT min(create_at) FROM t_visit_log),
                                            (SELECT max(create_at) FROM t_visit_log),
                                            INTERVAL '1 minute'
                                    ) AS minute)
        SELECT to_char(all_minutes.minute, 'YYYY-MM-DD HH24:MI') as date,
       cast(count(a.create_at) as INT)                     as total_count,
       cast(count(case when a.filter_page = 'WHITE' THEN 1 end) as INT) as ban_count,
       cast(count(case when a.filter_page = 'OFFER' THEN 1 end) as INT) as offer_count
        FROM all_minutes
            LEFT JOIN t_visit_log a
        ON to_char(all_minutes.minute, 'YYYY-MM-DD HH24:MI') = to_char(a.create_at, 'YYYY-MM-DD HH24:MI')
        where a.page_id = '${pageId}'
        GROUP BY date
        ORDER BY date;
    `);
  return reslt;
};

export const getFilterTypePieData = async (pageId: string) => {
  return mainDb.$queryRawUnsafe(`
        select tvl.filter_type as name, cast(count(1) as INT) as value
        from t_visit_log tvl
        where tvl.page_id = '${pageId}'
        group by tvl.filter_type
        order by value desc
    `);
};
