import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, ActivityIndicator} from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {Layout} from '../../components';
import {FilesServiceType} from '../../api/services/interfaces/files.interface';
import {addFile} from '../../api/services/files.service';

const UploadPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const uploadFile = async (file: FilesServiceType) => {
    setLoading(true);
    try {
      const resp = await addFile(file);
      console.log(resp.data);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {loading && <ActivityIndicator />}
        <Button
          title="Upload file"
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: [types.images, types.csv],
              });
              await uploadFile(pickerResult);
            } catch (e) {
              handleError(e);
            }
          }}
        />
      </View>
    </Layout>
  );
};

export default UploadPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
