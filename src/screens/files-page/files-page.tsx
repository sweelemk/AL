import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {readRemoteFile} from 'react-native-csv';
import {Empty, Layout} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {FilesServiceType} from '../../api/services/interfaces/files.interface';
import {getFiles} from '../../api/services/files.service';
import {filterData} from '../../helpers/helperFunc';

const FilesPage: React.FC = () => {
  const isFocused = useIsFocused();
  const [files, setFiles] = useState<FilesServiceType[]>([]);

  const readCSV = async (path: string) => {
    return new Promise((res, rej) => {
      readRemoteFile(path, {
        dynamicTyping: true,
        complete: (re: any) => {
          res(re.data.length);
        },
        error: (e: any) => {
          rej(e);
        },
      });
    }).then(r => {
      return r;
    });
  };

  const getFilesData = useCallback(async () => {
    try {
      const resp = await getFiles();
      const filteredResp = filterData(resp, 'csv');

      const data = await Promise.all(
        filteredResp.map(async f => {
          const d = f.fileCopyUri && (await readCSV(f.fileCopyUri));
          return {
            ...f,
            total: d,
          };
        }),
      );

      setFiles(data);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    isFocused && getFilesData();
  }, [getFilesData, isFocused]);

  const renderItem = ({item}: {item: FilesServiceType}) => {
    return (
      <View style={styles.fileBox}>
        <Text style={styles.fileItem} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.fileItem} numberOfLines={1}>
          {item.total}
        </Text>
      </View>
    );
  };

  return (
    <Layout>
      <View style={styles.fileBox}>
        <View style={styles.fileItem}>
          <Text>File name</Text>
        </View>
        <View style={styles.fileItem}>
          <Text>Total rows</Text>
        </View>
      </View>
      {files.length ? (
        <FlatList
          data={files}
          keyExtractor={item => item.name + item.id}
          renderItem={renderItem}
        />
      ) : (
        <Empty text="There is no any files yet." />
      )}
    </Layout>
  );
};

export default FilesPage;

const styles = StyleSheet.create({
  fileBox: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  fileItem: {
    width: '50%',
  },
});
