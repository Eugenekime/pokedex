import { Redirect } from 'expo-router';

import useSettingStore from '@/store/settingStore';
import { useEffect } from 'react';

export default function Index() {
  const loadSettings = useSettingStore((state) => state.loadSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  return <Redirect href="/(tabs)/home" />;
}
