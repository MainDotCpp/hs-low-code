'use client'

import { log } from "console"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function OAuthKK(){
    const searchParams = useSearchParams()
    const getToken = async (code:string) => {
        const form = new FormData()
        form.set('grant_type','authorization_code')
        form.set('client_id','6e65c2c625e239d40305df1f0ef53b5b')
        form.set('redirect_uri','https://leuandev.xyz/oauth/kk')
        form.set('code',code)
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