'use client'

import { log } from "console"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function OAuthKK(){
    const searchParams = useSearchParams()
    const getToken = async (code:string) => {
        const form = new FormData()
        form.set('grant_type','authorization_code22')
        form.set('client_id','f4e5d6f648ab7c61ca77f7c17bf73614')
        form.set('redirect_uri','https://leuandev.xyz/oauth/kk')
        form.set('code',code)
        form.set('client_secret','CJSPxyQkxzd3v2Zc23SIFmMtDhXu4r1D')
        const getTokenResp = await fetch('https://kauth.kakao.com/oauth/token',{
            method:'POST',
            headers:{
'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:form
        })
        const getTokenRespJson = await getTokenResp.json()
        console.log(getTokenRespJson)

    }
    useEffect(() => {
        const code = searchParams.get('code')
        if (!code) {return }
        getToken(code).then()

    },[])
    return <main>
        <div>SUCCESS</div>
        <div>{searchParams.get('code') || ''}</div>
    </main>
}