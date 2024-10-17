// import  { useEffect, useState } from 'react';
// import { Alert, Button, Card } from 'antd';
// import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
// import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
// import { IGetT_output } from '../../../../../gpt-ai-flow-common/i18nProvider/messages/localesFactory';

// interface SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input {
//   t: IGetT_output;
//   createAndOpenStripeBillingSession: () => void;
//   userId: string;
//   userAccessToken: string;
//   currencySymbol: ECurrencySymbol;
// }
// export const SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription = (
//   props: SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input
// ) => {
//   const { t, createAndOpenStripeBillingSession, userId, userAccessToken, currencySymbol } = props;

//   const [hasSubscriptions, setHasSubscriptions] = useState<boolean>(false);

//   const init = async () => {
//     const subscriptionResults = await TBackendStripeFile.getListStripeSubscriptionsByStripeCustomerId(
//       userId,
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON
//     );

//     if (subscriptionResults.data.length > 0) {
//       setHasSubscriptions(true);
//       return;
//     }
//     setHasSubscriptions(false);
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON, currencySymbol);

//   const createAndOpenStripeCheckoutSession = async (priceId: string) => {
//     const checkoutSessionResults = await TBackendStripeFile.createStripeCheckoutSessionForEUR(
//       userId,
//       priceId,
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON
//     );

//     window.open(checkoutSessionResults.url, '_blank', 'noreferrer');
//   };

//   return (
//     <div className="row">
//       <div className="row">
//         {t.get('Whether or not you already have a subscription')}: {hasSubscriptions ? t.get('Yes') : t.get('No')}
//       </div>
//       <div className="row">
//         <Alert
//           type="info"
//           message={
//             <span>
//               {t.get(
//                 'If you are unable to access your subscription while changing subscription types, try logging into your user account again'
//               )}
//             </span>
//           }
//         />
//       </div>
//       <div className="row">
//         <div className="row">
//           <h3>{t.get('Monthly')}</h3>
//           <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {stripePrices.month
//               .filter((item) => !item.name.includes('FreeAI'))
//               .map((oneProduct) => {
//                 return (
//                   <Card
//                     key={oneProduct.priceId}
//                     title={oneProduct.name}
//                     // extra={<a href="#">More</a>}
//                     style={{
//                       width: 350,
//                       marginLeft: '.8rem',
//                       marginBottom: '.8rem',
//                     }}
//                     // bodyStyle={{}}
//                     actions={[
//                       <Button
//                         type="primary"
//                         onClick={() => {
//                           if (!hasSubscriptions) {
//                             createAndOpenStripeCheckoutSession(oneProduct.priceId);
//                             return;
//                           }
//                           createAndOpenStripeBillingSession();
//                         }}
//                       >
//                         {t.get('Subscription')}
//                       </Button>,
//                     ]}
//                   >
//                     {oneProduct.features.map((oneFeature) => {
//                       return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
//                     })}
//                   </Card>
//                 );
//               })}
//           </div>
//         </div>
//         <div className="row">
//           <h3>{t.get('Quarterly')}</h3>
//           <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {stripePrices.quarter
//               .filter((item) => !item.name.includes('FreeAI'))
//               .map((oneProduct) => {
//                 return (
//                   <Card
//                     key={oneProduct.priceId}
//                     title={oneProduct.name}
//                     // extra={<a href="#">More</a>}
//                     style={{
//                       width: 350,
//                       marginLeft: '.8rem',
//                       marginBottom: '.8rem',
//                     }}
//                     actions={[
//                       <Button
//                         type="primary"
//                         onClick={() => {
//                           if (!hasSubscriptions) {
//                             createAndOpenStripeCheckoutSession(oneProduct.priceId);
//                             return;
//                           }
//                           createAndOpenStripeBillingSession();
//                         }}
//                       >
//                         {t.get('Subscription')}
//                       </Button>,
//                     ]}
//                   >
//                     {oneProduct.features.map((oneFeature) => {
//                       return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
//                     })}
//                   </Card>
//                 );
//               })}
//           </div>
//         </div>
//         <div className="row">
//           <h3>{t.get('Annually')}</h3>
//           <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {stripePrices.year
//               .filter((item) => !item.name.includes('FreeAI'))
//               .map((oneProduct) => {
//                 return (
//                   <Card
//                     key={oneProduct.priceId}
//                     title={oneProduct.name}
//                     // extra={<a href="#">More</a>}
//                     style={{
//                       width: 350,
//                       marginLeft: '.8rem',
//                       marginBottom: '.8rem',
//                     }}
//                     actions={[
//                       <Button
//                         type="primary"
//                         onClick={() => {
//                           if (!hasSubscriptions) {
//                             createAndOpenStripeCheckoutSession(oneProduct.priceId);
//                             return;
//                           }
//                           createAndOpenStripeBillingSession();
//                         }}
//                       >
//                         {t.get('Subscription')}
//                       </Button>,
//                     ]}
//                   >
//                     {oneProduct.features.map((oneFeature: string) => {
//                       return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
//                     })}
//                   </Card>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
