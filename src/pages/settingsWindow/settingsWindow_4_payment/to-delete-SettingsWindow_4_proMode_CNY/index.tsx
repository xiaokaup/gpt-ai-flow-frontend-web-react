// import '../../../../../styles/global.css';
// import '../../../../../styles/layout.scss';

// import  { useEffect, useState } from 'react';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { CopyOutlined } from '@ant-design/icons';

// import { Alert, Button, Tag, message } from 'antd';

// import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
// import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
// import { ERegionDB_code } from '../../../../../gpt-ai-flow-common/enum-database/ERegionDB';
// import { ESubscriptionVersion } from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
// import { IUseSubscriptionDB_v2Data_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
// import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
// import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
// import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import TBackendSubscription_v2File from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendSubscription_v2';
// import { IGetT_output } from '../../../../../gpt-ai-flow-common/i18nProvider/messages/localesFactory';

// import { SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription';
// import { FreeVersionAnnounce } from '../FreeVersionAnnounce';

// interface SettingsWindow_4_proMode_CNY_input {
//   t: IGetT_output;
//   userData: IUserData;
//   useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output;
// }
// export const SettingsWindow_4_proMode_CNY = (props: SettingsWindow_4_proMode_CNY_input) => {
//   const { t, userData, useSubscription_v2DataOutput } = props;
//   const {
//     id: userId,
//     email: userEmail,
//     token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
//   } = userData;

//   if (!userId) {
//     return <>{t.get('Please register a user and log in first')}</>;
//   }

//   const { subscription_v2Data, setSubscription_v2Data } = useSubscription_v2DataOutput;
//   const { hasTrial, stripeCustomerId } = subscription_v2Data;
//   const [hasTrialForSubscription_v2, setHasTrialForSubscription_v2] = useState<boolean>(hasTrial);
//   const isExpired = new Date(subscription_v2Data.expiredAt) < new Date();

//   useEffect(() => {
//     setSubscription_v2Data(subscription_v2Data);
//     setHasTrialForSubscription_v2(subscription_v2Data.hasTrial);
//   }, [
//     subscription_v2Data.id,
//     subscription_v2Data.userId,
//     subscription_v2Data.productLimitId,
//     subscription_v2Data.period,
//     subscription_v2Data.regionId,
//     subscription_v2Data.hasTrial,
//     subscription_v2Data.expiredAt,
//     subscription_v2Data.stripeCustomerId,
//   ]);

//   const startATrialSubscriptionForCNY_with_subscriptionVersion = async (subscriptionVersion: ESubscriptionVersion) => {
//     if (!userId) {
//       message.error(t.get('Please register a user and log in first'));
//       return;
//     }

//     const stripeCustomer = await TBackendStripeFile.createStripeCustomer(
//       userId.toString(),
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON
//     );
//     const { id: stripeCustomerId } = stripeCustomer;
//     const results = await TBackendSubscription_v2File.startATrialSubscription_v2ForCNY(
//       userId.toString(),
//       stripeCustomerId,
//       subscriptionVersion,
//       userAccessToken,
//       CONSTANTS_GPT_AI_FLOW_COMMON
//     );

//     message.success(t.get('Free trial is now open'));
//     setHasTrialForSubscription_v2(true);
//     setSubscription_v2Data(results);
//   };

//   return (
//     <div className="row pageContainer">
//       {!hasTrialForSubscription_v2 && (
//         <div className="row hasNotStartTrial">
//           <div className="row">
//             <div>
//               ({t.get('Please make sure the email address you fill in is the same as your account email address')})
//             </div>
//             <div>
//               {t.get('Email')}: {userEmail}
//               <CopyToClipboard
//                 text={userEmail}
//                 onCopy={() => {
//                   message.success({
//                     content: <span>{t.get('Copy successful')} !</span>,
//                     key: 'copy',
//                     duration: 3,
//                   });
//                 }}
//               >
//                 <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
//               </CopyToClipboard>
//             </div>
//           </div>
//           <div className="row" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//             <Button
//               type="primary"
//               onClick={() => {
//                 startATrialSubscriptionForCNY_with_subscriptionVersion(ESubscriptionVersion.OFFICIAL_MODAL);
//               }}
//               style={{ marginTop: '.2rem' }}
//             >
//               {t.get('Getting Started: Getting Started with the StarterAI Model Edition')} (
//               {t.get('Avoid the tedious setup and get right to it')})
//             </Button>
//             <Button
//               type="primary"
//               onClick={() => {
//                 startATrialSubscriptionForCNY_with_subscriptionVersion(ESubscriptionVersion.TOOL);
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
//                     'Please refresh the page or restart the software after the payment has been made or a single successful payment has been made'
//                   )}
//                 </span>
//               }
//             />
//           </div>
//         </div>
//       )}

//       {hasTrialForSubscription_v2 && (
//         <div className="row hasStartTrial">
//           {stripeCustomerId && subscription_v2Data.Region?.code === ERegionDB_code.EN && (
//             <div className="row">
//               <p>{t.get('Please check your subscription in overseas regions')}</p>
//             </div>
//           )}

//           {subscription_v2Data.Region?.code === ERegionDB_code.ZH && (
//             <div className="row subscirption_zh">
//               <div className="row">
//                 {t.get('Email')}: {userEmail}
//                 <CopyToClipboard
//                   text={userEmail}
//                   onCopy={() => {
//                     message.success({
//                       content: <span>{t.get('Copy successful')} !</span>,
//                       key: 'copy',
//                       duration: 3,
//                     });
//                   }}
//                 >
//                   <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
//                 </CopyToClipboard>
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
//                     {subscription_v2Data.expiredAt && isExpired ? (
//                       <Tag color="#f50">{t.get('Expired')}</Tag>
//                     ) : (
//                       <Tag color="#2db7f5">{t.get('Valid')}</Tag>
//                     )}
//                   </span>
//                 </span>
//               </div>

//               <div className="row">
//                 <SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription
//                   t={t}
//                   currencySymbol={ECurrencySymbol.CNY}
//                   userId={userId.toString()}
//                   userAccessToken={userAccessToken}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <FreeVersionAnnounce locale={t.currentLocale} subscription_v2Data={subscription_v2Data} />
//     </div>
//   );
// };
