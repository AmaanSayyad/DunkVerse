import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100;200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <meta
          name='viewport'
          content='width-device-width, initial-scale=1, viewport-fit=cover'
        />
        <script
          src="https://www.paypal.com/sdk/js?client-id=AQAWZfXEWHtGD5hxkS-PPQ_iN3qDLzFAdpx9dgE0eUWC2FsmBBfbiTeE5_GwjzxXAbKTDCgE-Fgk1KSM&components=buttons,card-fields"
          async
        ></script>
      </Head>
      <body className='mx-auto h-full w-full bg-dark mobile-demo:max-w-[500px]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}