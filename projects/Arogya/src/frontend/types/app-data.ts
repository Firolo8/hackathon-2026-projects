import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type VitalItem = {
  id: string;
  label: string;
  value: string;
  unit: string;
};

export type HomeSummary = {
  greetingName: string;
  summaryText: string;
  medication: {
    label: string;
    name: string;
    dueText: string;
    actionLabel: string;
  };
  recoveryStatus: {
    title: string;
    value: string;
  };
  checkIn: {
    title: string;
    value: string;
    actionLabel: string;
  };
  vitals: VitalItem[];
  doctorMessage: {
    title: string;
    message: string;
  };
  emergencyLabel: string;
};