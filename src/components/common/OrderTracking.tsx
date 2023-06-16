/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f',
};

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#049C0B',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#049C0B',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#049C0B',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#049C0B',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#049C0B',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 11,
  currentStepLabelColor: '#049C0B',
};

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7eaec4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#7eaec4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#7eaec4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4',
};

const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#049C0B',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'check';
      break;
    }
    case 1: {
      iconConfig.name = 'local-shipping';
      break;
    }
    case 2: {
      iconConfig.name = 'delivery-dining';
      break;
    }
    case 3: {
      iconConfig.name = 'payment';
      break;
    }
    case 4: {
      iconConfig.name = 'track-changes';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  // Get the current date
  const currentDate = new Date();

  // Create a new date by adding 2 days to the current date
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + 2);

  const futureDate1 = new Date();
  futureDate1.setDate(currentDate.getDate() + 8);

  // Get the day of the week for the future date
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const futureDayOfWeek = daysOfWeek[futureDate1.getDay()];

  // Format the dates as "Jun 12"
  const options: any = {month: 'short', day: 'numeric'};
  const formattedCurrentDate = currentDate.toLocaleString('en-US', options);
  const formattedFutureDate = futureDate.toLocaleString('en-US', options);
  const formattedFutureDate1 = futureDate1.toLocaleString('en-US', options);

  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };

  const renderViewPagerPage = (data: any) => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const renderLabel = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={currentPage}
          stepCount={4}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={[
            `Order Confirmed ${formattedCurrentDate}`,
            `Shipped, ${formattedFutureDate}`,
            'Out For Delivery',
            `Delivery, ${futureDayOfWeek} ${formattedFutureDate1}`,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
