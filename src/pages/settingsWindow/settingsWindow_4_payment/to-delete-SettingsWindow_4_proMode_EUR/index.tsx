// import '../../../../../styles/global.css';
// import '../../../../../styles/layout.scss';

// // import paymentPageDemo from '../../../../../../assets/presentation/2023-11-08-img-2-Add-default-payment-method.png';

// import { useEffect, useState } from 'react';
// import copyToClipboard from 'copy-to-clipboard';

// import { Alert, Button, Tag, message } from 'antd';
// import { CopyOutlined } from '@ant-design/icons';

// import { IUserDB } from '../../../../../gpt-ai-flow-common/interface-app/IUserDB';
// import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
// import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
// import { ERegionDB_code } from '../../../../../gpt-ai-flow-common/enum-database/ERegionDB';
// import { ESubscriptionVersion } from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
// import { IUseSubscriptionDB_v2Data_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
// import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
// import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import TBackendSubscription_v2File from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendSubscription_v2';
// import { IGetT_output } from '../../../../../gpt-ai-flow-common/i18nProvider/messages/localesFactory';

// import { FreeVersionAnnounce } from '../FreeVersionAnnounce';

// import { SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription';

// interface SettingsWindow_4_proMode_EUR_input {
//   t: IGetT_output;
//   userDB: IUserDB;
//   useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output;
// }
// export const SettingsWindow_4_proMode_EUR = (props: SettingsWindow_4_proMode_EUR_input) => {
//   const { t, userDB, useSubscription_v2DataOutput } = props;
//   const {
//     id: userId,
//     email: userEmail,
//     token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
//   } = userDB;

//   if (!userId) {
//     return <>{t.get('Please register a user and log in first')}</>;
//   }

//   const {
//     init: initStripeSubscriptionInfo,
//     subscription_v2Data,
//     setSubscription_v2Data,
//     check: { hasAvailableSubscription_v2 },
//     // hasDefaultPamentMethod,
//   } = useSubscription_v2DataOutput;
//   const [hasTrialForSubscription_v2, setHasTrialForSubscription_v2] = useState<boolean>(subscription_v2Data.hasTrial);
//   const isExpired = new Date(subscription_v2Data?.expiredAt) < new Date();

//   useEffect(() => {
//     setHasTrialForSubscription_v2(subscription_v2Data.hasTrial);
//   }, [
//     subscription_v2Data.id,
//     subscription_v2Data.userId,
//     subscription_v2Data.productLimitId,
//     subscription_v2Data.regionId,
//     subscription_v2Data.hasTrial,
//     subscription_v2Data.expiredAt,
//   ]);

//   const startATrialSubscriptionForEUR_with_subscriptionVersion = async (subscriptionVersion: ESubscriptionVersion) => {
//     if (!userId) {
//       message.error(t.get('Please register a user and log in first'));
//       return;
//     }

//     const stripeCustomer = await TBackendStripeFile.createStripeCustomer(
//       userId.toString(),
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON,
//     );
//     const { id: stripeCustomerId } = stripeCustomer;
//     const results = await TBackendSubscription_v2File.startATrialSubscription_v2ForEUR(
//       userId.toString(),
//       stripeCustomerId,
//       subscriptionVersion,
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON,
//     );

//     message.success(t.get('Free trial is now open'));

//     setHasTrialForSubscription_v2(true);
//     setSubscription_v2Data(results);
//   };

//   const createAndOpenStripeBillingSession = async () => {
//     const billingSessionResults = await TBackendStripeFile.createStripeBillingPortal(
//       userId.toString(),
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON,
//     );

//     if (billingSessionResults?.status === 'error') {
//       message.error(billingSessionResults.message);
//     }

//     window.open(billingSessionResults.url, '_blank', 'noreferrer');
//   };

//   return (
//     <div className="row">
//       {!hasTrialForSubscription_v2 && (
//         <div className="row hasNotStartTrial">
//           <div className="row">
//             <div>
//               ({t.get('Please make sure the email address you fill in is the same as your account email address')})
//             </div>
//             <div>
//               {t.get('Email')}: {userEmail}
//               <CopyOutlined
//                 style={{ fontSize: 16, marginLeft: '0.4rem' }}
//                 onClick={() => {
//                   copyToClipboard(userEmail);

//                   message.success({
//                     content: <span>{t.get('Copy successful')} !</span>,
//                     key: 'copy',
//                     duration: 3,
//                   });
//                 }}
//               />
//             </div>
//           </div>
//           <div className="row" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//             <Button
//               type="primary"
//               onClick={() => {
//                 startATrialSubscriptionForEUR_with_subscriptionVersion(ESubscriptionVersion.OFFICIAL_MODAL);
//               }}
//               style={{ marginTop: '.2rem' }}
//             >
//               {t.get('Getting Started: Getting Started with the StarterAI Model Edition')} (
//               {t.get('Avoid the tedious setup and get right to it')})
//             </Button>
//             <Button
//               type="primary"
//               onClick={() => {
//                 startATrialSubscriptionForEUR_with_subscriptionVersion(ESubscriptionVersion.TOOL);
//               }}
//               style={{ marginTop: '.2rem' }}
//             >
//               {t.get('Start Trial Getting StartedAI Tools Edition')} ({t.get('Requires your own OpenAI key')})
//             </Button>
//           </div>
//           <div className="row">
//             <Alert
//               type="info"
//               style={{ cursor: 'pointer' }}
//               message={
//                 <span>
//                   {t.get(
//                     'Please refresh the page or restart the software after the payment has been made or a single successful payment has been made',
//                   )}
//                 </span>
//               }
//             />
//           </div>
//         </div>
//       )}

//       {hasTrialForSubscription_v2 && (
//         <div className="row hasStartTrial">
//           {subscription_v2Data.Region?.code === ERegionDB_code.ZH && (
//             <div className="row">
//               <p>{t.get('Please check your subscription in your domestic region')}</p>
//             </div>
//           )}

//           {subscription_v2Data.Region?.code === ERegionDB_code.EN && (
//             <div className="row subscription_en">
//               <div className="row">
//                 {t.get('Email')}: {userEmail}
//                 <CopyOutlined
//                   style={{ fontSize: 16, marginLeft: '0.4rem' }}
//                   onClick={() => {
//                     copyToClipboard(userEmail);

//                     message.success({
//                       content: <span>{t.get('Copy successful')} !</span>,
//                       key: 'copy',
//                       duration: 3,
//                     });
//                   }}
//                 />
//               </div>
//               <div className="row">
//                 <Button
//                   type="primary"
//                   onClick={() => {
//                     createAndOpenStripeBillingSession();
//                   }}
//                 >
//                   {t.get('My Subscription')}
//                 </Button>
//               </div>

//               <div className="row">
//                 {t.get('Subscription Name')}: {subscription_v2Data?.Product_Limit?.Product?.name}
//                 <br />
//                 {t.get('Subscription Duration')}: {subscription_v2Data.period}
//                 <br />
//                 {t.get('Subscription Version')}: {subscription_v2Data?.Product_Limit?.Product?.version}
//                 <br />
//                 {t.get('Subscription Expiry Date')}:{' '}
//                 <span>
//                   <span className="column">
//                     {subscription_v2Data.expiredAt &&
//                       new Date(subscription_v2Data.expiredAt)?.toISOString().split('T')[0]}
//                   </span>
//                   <span className="column">
//                     {subscription_v2Data?.expiredAt && isExpired ? (
//                       <Tag color="#f50">{t.get('Expired')}</Tag>
//                     ) : (
//                       <Tag color="#2db7f5">{t.get('Valid')}</Tag>
//                     )}
//                   </span>
//                 </span>
//               </div>

//               {/*
//               <div className="row">
//                 是否有默认支付方式:
//                 {hasDefaultPamentMethod ? '是' : '否'}
//                 {!hasDefaultPamentMethod && (
//                   <div className="row">
//                     <Alert
//                       type="info"
//                       message={
//                         <span>
//                           需要重新购买订阅，请先点击‘我的订阅’按钮，在支付管理页面中添加并设置为
//                           <b style={{ color: '#3875f6' }}>默认</b>支付方式
//                         </span>
//                       }
//                     />
//                     <img src={paymentPageDemo} alt="" style={{ width: '100%', marginTop: '1rem' }} />
//                   </div>
//                 )}
//               </div> */}

//               {userId && (
//                 <div className="row">
//                   <SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription
//                     t={t}
//                     createAndOpenStripeBillingSession={createAndOpenStripeBillingSession}
//                     userId={userId.toString()}
//                     userAccessToken={userAccessToken}
//                     currencySymbol={ECurrencySymbol.EUR}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       <FreeVersionAnnounce locale={t.currentLocale} subscription_v2Data={subscription_v2Data} />
//     </div>
//   );
// };
