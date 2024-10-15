This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 기록


### Workbox
구글에서 개발한 서비스 워커와 관련된 라이브러리 모음입니다. 이 라이브러리는 프로그레시브 웹 앱(PWA)을 만들고 오프라인 경험을 향상시키는 데 도움을 주는 강력한 도구입니다.
Workbox의 주요 특징:
1. 캐싱 전략:
NetworkFirst, CacheFirst, StaleWhileRevalidate 등 다양한 캐싱 전략을 제공합니다.
이를 통해 개발자는 각 리소스 유형에 맞는 최적의 캐싱 방식을 쉽게 구현할 수 있습니다.
2. 라우팅:
URL 패턴에 따라 다른 캐싱 전략을 적용할 수 있습니다.
3. 사전 캐싱:
앱의 핵심 자산을 미리 캐시하여 오프라인 사용을 가능하게 합니다.
백그라운드 동기화:
오프라인 상태에서 발생한 요청을 온라인 상태가 되면 자동으로 처리합니다.
4. 푸시 알림:
웹 푸시 알림을 쉽게 구현할 수 있도록 지원합니다.
5. 디버깅 도구:
서비스 워커 디버깅을 위한 도구를 제공합니다.
6. 버전 관리:
캐시 버전 관리를 자동화하여 업데이트 프로세스를 간소화합니다.
Workbox를 사용하면 복잡한 서비스 워커 로직을 간단하게 구현할 수 있어, 개발 시간을 단축하고 오류 가능성을 줄일 수 있습니다. 또한, 성능 최적화와 오프라인 기능 구현에 필요한 많은 베스트 프랙티스를 자동으로 적용할 수 있습니다.
예를 들어, 현재 코드에서 사용된 workbox.NetworkFirst는 네트워크 요청을 먼저 시도하고, 실패할 경우 캐시된 응답을 제공하는 전략입니다. 이는 최신 콘텐츠를 우선으로 하면서도 오프라인 기능을 제공하는 데 유용합니다.
Workbox는 복잡한 PWA 개발을 단순화하고, 효율적인 캐싱 및 오프라인 전략을 구현하는 데 매우 유용한 도구입니다.