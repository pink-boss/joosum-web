export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '주섬',
    alternateName: 'Joosum',
    url: 'https://app.joosum.com',
    logo: 'https://app.joosum.com/images/joosum.png',
    description: '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하는 서비스',
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://joosum.com/contact',
    },
    sameAs: [
      'https://apps.apple.com/app/joosum/id6450023650',
      'https://play.google.com/store/apps/details?id=com.joosum.app',
    ],
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '주섬',
    url: 'https://app.joosum.com',
    description: '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하는 서비스',
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://app.joosum.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareApplicationData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '주섬',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: ['iOS', 'Android', 'Web'],
    description: '웹에서 발견한 유용한 링크들을 간편하게 저장하고 정리하는 서비스',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    downloadUrl: [
      'https://apps.apple.com/app/joosum/id6450023650',
      'https://play.google.com/store/apps/details?id=com.joosum.app',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationData),
        }}
      />
    </>
  );
}
