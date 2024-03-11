'use client'
import { Button } from "antd";

export default function Login() {
    return <div>
        <Button onClick={() => {
            window.open(`
            https://kauth.kakao.com/oauth/authorize?client_id=1046232&redirect_uri=https://leuandev.xyz/oauth/kk&response_type=code
            `)
        }}>登录</Button>
    </div>
}