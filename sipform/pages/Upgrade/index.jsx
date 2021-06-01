import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/router";

export default function Upgrade() {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="Under Construction"
      subTitle="Sorry, the page is under constriction."
      style={{padding:"12vw 0 0 0"}}
      extra={
        <Button type="primary" onClick={() => router.push("/")}>
          Back Home
        </Button>
      }
    />
  );
}
