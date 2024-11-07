export interface UserCredentials {
  signinIdentifier1: string;
  signinIdentifier2: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignupRequestBody {
  id: number;
  name: string;
  username: string;
  email: string;
  contact: string;
  address: string;
  password: string;
  cpassword: string;
}

export interface BranchData {
  vehicle: string[];
  serviceType: string[];
  mechanic: string[];
}

export interface Data {
  [key: string]: BranchData;
}

export interface SlotAvailability {
  [date: string]: string[];
}

export type ErrorTypeSignUp = {
  email?: string;
  password?: string;
  username?: string;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export interface BookingListAdminData {
  id: number;
  branch: string;
  name: string;
  number: string;
  vehicleType: string;
  serviceRequest: string;
  plateNumber: string;
  otherRequest: string;
  date: string;
  time: string;
  bookedDate: string;
  bookedTime: string;
  status: string;
  category: string;
}

export interface MyAdminViewDialogProps {
  data: BookingListAdminData | null;
  onClose: () => void;
  open: boolean;
  onConfirmCancel: () => void;
  onConfirmApprove: () => void;
}

export interface MyAdminAddBookingDialogProps {
  onClose: () => void;
  open: boolean;
}

export interface Branch {
  branchName: string;
  branchCode: string;
  position: string[];
}

export interface FetchError {
  message: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  contact: string;
  address: string;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  branchName: string;
  branchCode: string;
  position: string;
  password: string;
}

export interface AuthContextType {
  users: any | null;
  isLoading: boolean;
  isError: boolean;
}