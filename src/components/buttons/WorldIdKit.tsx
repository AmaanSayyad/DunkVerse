// 'use client'; // for Next.js app router
// import {
//   IDKitWidget,
//   ISuccessResult,
//   VerificationLevel,
// } from '@worldcoin/idkit';
// import React from 'react';

// const WorldIdKit = () => {
//   const onSuccess = () => {
//     window.location.href = '/success';
//   };
//   const handleVerify = async (proof: ISuccessResult) => {
//     const res = await fetch('/api/verify', {
//       // route to your backend will depend on implementation
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(proof),
//     });
//     if (!res.ok) {
//       throw new Error('Verification failed.'); // IDKit will display the error message to the user in the modal
//     }
//   };

//   return (
//     <>
//       <IDKitWidget
//         app_id={`app_${process.env.NEXT_PUBLIC_WLD_CLIENT_ID || 'default'}`} // obtained from the Developer Portal
//         action='verify-identity' // obtained from the Developer Portal
//         onSuccess={onSuccess} // callback when the modal is closed
//         handleVerify={handleVerify} // callback when the proof is received
//         verification_level={VerificationLevel.Orb}
//       ></IDKitWidget>
//     </>
//   );
// };

// export default WorldIdKit;
