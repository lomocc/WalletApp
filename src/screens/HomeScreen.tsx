import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import React, {
  ElementRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from 'react';
import useMnemonics from '../contexts/useMnemonics';
import createMnemonic from '../utils/createMnemonic';

import {
  Animated,
  Button,
  FlatList,
  PanResponder,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Mnemonic from '../components/Mnemonic';

function CardSection(props: { index: number; color: string }) {
  return (
    <View
      style={StyleSheet.compose(styles.sectionBg, {
        // @ts-ignore
        backgroundColor: props.color,
      })}
    >
      <Text style={styles.sectionText}>Section #{props.index}</Text>
    </View>
  );
}
const cardData = Array(5);

function Card(props: { color: string }) {
  const renderItem = ({ item, index }: any) => (
    <CardSection color={props.color} index={index} />
  );

  const separatorComponent = () => <View style={styles.separator} />;

  const listRef = useRef<ElementRef<typeof FlatList>>(null);

  React.useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [props.color]);

  return (
    <View style={styles.card}>
      <FlatList
        style={{ flex: 1 }}
        data={cardData}
        renderItem={renderItem}
        ItemSeparatorComponent={separatorComponent}
        ref={listRef}
      />
    </View>
  );
}

function SwipeableCard(props: {
  zIndex: number;
  color: string;
  onSwipedOut: () => void;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const movementX = React.useMemo(() => new Animated.Value(0), [props.color]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (e, gestureState) => {
          const { dx } = gestureState;
          return Math.abs(dx) > 5 && Math.abs(dx) < 120;
        },
        onPanResponderMove: Animated.event([null, { dx: movementX }], {
          useNativeDriver: false,
        }),
        onPanResponderEnd: (e, gestureState) => {
          const { dx } = gestureState;
          if (Math.abs(dx) > 120) {
            Animated.timing(movementX, {
              toValue: dx > 0 ? 100 : -100,
              useNativeDriver: true,
            }).start(props.onSwipedOut);
          } else {
            Animated.timing(movementX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [movementX, props.onSwipedOut]
  );

  return (
    <View
      // @ts-ignore
      style={StyleSheet.compose(styles.container, { zIndex: props.zIndex })}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: movementX }],
          flex: 1,
        }}
      >
        <Card color={props.color} />
      </Animated.View>
    </View>
  );
}

function SwipeableCardExample() {
  const cardColors = ['red', 'blue', 'pink', 'aquamarine'];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextIndex = currentIndex + 1;

  const isFirstCardOnTop = currentIndex % 2 !== 0;

  const incrementCurrent = () => setCurrentIndex(currentIndex + 1);

  const getCardColor = (index: number) => cardColors[index % cardColors.length];

  /*
   * The cards try to reuse the views. Instead of always rebuilding the current card on top
   * the order is configured by zIndex. This way, the native side reuses the same views for bottom
   * and top after swiping out.
   */
  return (
    <>
      <SwipeableCard
        zIndex={isFirstCardOnTop ? 2 : 1}
        color={
          isFirstCardOnTop
            ? getCardColor(currentIndex)
            : getCardColor(nextIndex)
        }
        onSwipedOut={incrementCurrent}
      />
      <SwipeableCard
        zIndex={isFirstCardOnTop ? 1 : 2}
        color={
          isFirstCardOnTop
            ? getCardColor(nextIndex)
            : getCardColor(currentIndex)
        }
        onSwipedOut={incrementCurrent}
      />
    </>
  );
}

const Item: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);
export default function HomeScreen({
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  const initialize = useMnemonics(state => state.initialize);
  const onClearMnemonics = useMnemonics(state => state.clearMnemonics);
  const addMnemonic = useMnemonics(state => state.addMnemonic);
  const mnemonics = useMnemonics(state => state.getMnemonics());

  const onCreateMnemonic = useCallback(() => {
    const mnemonic = createMnemonic();
    addMnemonic(mnemonic);
  }, [addMnemonic]);

  const sections = useMemo(
    () =>
      mnemonics.map(mnemonic => ({
        mnemonic,
        data: [],
      })),
    [mnemonics]
  );

  // const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count

    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => onCreateMnemonic()} title="Create" />
      ),
      headerLeft: () => (
        <Button onPress={() => onClearMnemonics()} title="Clear" />
      ),
    });
  }, [navigation, onCreateMnemonic, onClearMnemonics]);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaView className={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <SwipeableCardExample />
      <SectionList
        sections={sections}
        // keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { mnemonic } }) => (
          <Mnemonic mnemonic={mnemonic} />
        )}
      />
      <Button
        onPress={() => onClearMnemonics()}
        title="clearMnemonics"
        color={'green'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: 10,
    paddingTop: 30,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
  },
  sectionBg: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
