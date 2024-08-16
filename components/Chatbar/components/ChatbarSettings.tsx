// import { IconFileExport, IconSettings,IconSettingsBolt,IconUserCircle } from '@tabler/icons-react';
// import { useContext, useState } from 'react';

// import { useTranslation } from 'next-i18next';

// import HomeContext from '@/pages/api/home/home.context';

// import { SettingDialog } from '@/components/Settings/SettingDialog';

// import { Import } from '../../Settings/Import';
// import { Key } from '../../Settings/Key';
// import { SidebarButton } from '../../Sidebar/SidebarButton';
// import ChatbarContext from '../Chatbar.context';
// import { ClearConversations } from './ClearConversations';
// // import { PluginKeys } from './PluginKeys';

// export const ChatbarSettings = () => {
//   const { t } = useTranslation('sidebar');
//   const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

//   const {
//     state: {
//       apiKey,
//       lightMode,
//       serverSideApiKeyIsSet,
//       // serverSidePluginKeysSet,
//       conversations,
//     },
//     dispatch: homeDispatch,
//   } = useContext(HomeContext);

//   const {
//     handleClearConversations,
//     handleImportConversations,
//     handleExportData,
//     handleApiKeyChange,
//   } = useContext(ChatbarContext);

//   return (
//     // uichange
//     <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
     

      
// {/* 
//       <SidebarButton
//         text={t('Profile')}
//         icon={<IconUserCircle size={18} />}
//         onClick={() => handleExportData()}
//       /> */}
//       {/* <SidebarButton
//         text={t('Setting')}
//         icon={<IconSettingsBolt size={18} />}
//         onClick={() => handleExportData()}
//       /> */}

//       {/* <SidebarButton
//         text={t('Settings')}
//         icon={<IconSettings size={18} />}
//         onClick={() => setIsSettingDialog(true)}
//       /> */}

//       {/* {!serverSideApiKeyIsSet ? (
//         <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
//       ) : null} */}

//       {/* {!serverSidePluginKeysSet ? <PluginKeys /> : null} */}

//       {/* <SettingDialog
//         open={isSettingDialogOpen}
//         onClose={() => {
//           setIsSettingDialog(false);
//         }}
//       /> */}
//     </div>
//   );
// };
import { IconFileExport, IconSettings, IconSettingsBolt, IconUserCircle } from '@tabler/icons-react';
import { useContext, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import HomeContext from '@/pages/api/home/home.context';
import ChatbarContext from '../Chatbar.context';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const fileInputRef = useRef(null);

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('csvfile', file);

    try {
      const response = await fetch('http://localhost:8000/v1/csvfile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm relative">
      {/* Other sidebar content here */}

      {/* Upload CSV Button */}
      <button
        onClick={handleFileUploadClick}
        className="mt-2 px-6 py-2 bg-customPurple text-white rounded-md hover:bg-customGrey transition-colors duration-200"
      >
        Upload CSV
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* View CSV Link */}
      <p className="text-sm text-stone-600 underline mt-1">
        View CSV
      </p>
    </div>
  );
};

