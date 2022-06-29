import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import {Empty, Layout} from '../../components';
import {getFiles} from '../../api/services/files.service';
import {filterData} from '../../helpers/helperFunc';
import {FilesServiceType} from '../../api/services/interfaces/files.interface';

const ImagesPage: React.FC = () => {
  const w = Dimensions.get('window').width;
  const isFocused = useIsFocused();
  const [images, setImages] = useState<FilesServiceType[]>([]);
  const getImages = async () => {
    try {
      const resp = await getFiles();
      const filteredResp = filterData(resp, 'image');
      setImages(filteredResp);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    isFocused && getImages();
  }, [isFocused]);

  const renderItem = ({item}: {item: FilesServiceType}) => (
    <View style={styles.imageBox}>
      {item.fileCopyUri && (
        <AutoHeightImage source={{uri: item.fileCopyUri}} width={w} />
      )}
    </View>
  );

  return (
    <Layout>
      {images.length ? (
        <FlatList
          data={images}
          keyExtractor={item => item.name + item.id}
          renderItem={renderItem}
        />
      ) : (
        <Empty text="There is no any images yet." />
      )}
    </Layout>
  );
};

export default ImagesPage;

const styles = StyleSheet.create({
  imageBox: {},
});
