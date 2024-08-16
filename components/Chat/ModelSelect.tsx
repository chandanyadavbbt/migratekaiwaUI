// import { useContext, useEffect } from 'react';
// import { useTranslation } from 'next-i18next';
// import HomeContext from '@/pages/api/home/home.context';
// import { OpenAIModels } from '@/types/openai';


// export const ModelSelect = () => {
//   const { t } = useTranslation('chat');

//   const {
//     state: { selectedConversation, defaultModelId },
//     handleUpdateConversation,
//   } = useContext(HomeContext);

//   const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedModel = OpenAIModels[e.target.value];
//     selectedConversation &&
//       handleUpdateConversation(selectedConversation, {
//         key: 'model',
//         value: selectedModel,
//       });

//     // Make a POST request to send the selected model ID to the backend
//     try {
//       const response = await fetch('http://127.0.0.1:8000/v1/selectedModels', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: e.target.value }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to send selected model ID to the backend');
//       }
//       console.log('Selected model ID sent to the backend successfully');
//     } catch (error) {
//       console.error('Error sending selected model ID to the backend:', error);
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/v1/models');
//         if (!response.ok) {
//           throw new Error('Failed to fetch models');
//         }
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching models:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col">
//       <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
//         {t('Model')}
//       </label>
//       <div className="w-full rounded-lg bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
//         <select
//           className="w-full bg-transparent p-2"
//           value={selectedConversation?.model?.id || defaultModelId}
//           onChange={handleChange}
//         >
//           {Object.keys(OpenAIModels).map((modelId) => (
//             <option
//               key={modelId}
//               value={modelId}
//               className="dark:bg-[#4CB9E7] dark:text-white"
//             >
//               {OpenAIModels[modelId].name}
//             </option>
//           ))}
          
//         </select>
//       </div>
//     </div>
//   );
// };
