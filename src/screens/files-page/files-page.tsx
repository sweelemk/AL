import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";
import {Layout} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {FilesServiceType} from '../../api/services/interfaces/files.interface';
import {getFiles} from '../../api/services/files.service';
import {filterData} from '../../helpers/helperFunc';

const FilesPage: React.FC = () => {
  const isFocused = useIsFocused();
  const [files, setFiles] = useState<FilesServiceType[]>([]);
  const getImages = async () => {
    try {
      const resp = await getFiles();
      const filteredResp = filterData(resp, 'csv');
      setFiles(filteredResp);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    isFocused && getImages();
  }, [isFocused]);

  const renderItem = ({item}: {item: FilesServiceType}) => (
    <View style={styles.fileBox}>
      <Text numberOfLines={1}>{item.name}</Text>
    </View>
  );

  return (
    <Layout>
      {files.length ? (
        <FlatList
          data={files}
          keyExtractor={item => item.name + item.id}
          renderItem={renderItem}
        />
      ) : null}
    </Layout>
  );
};

export default FilesPage;

const styles = StyleSheet.create({
  fileBox: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
