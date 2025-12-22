


export interface UserDto {
  id: string;
  email: string;
  role: string;
  createdAt: Date;

  student?: {
    lastName: string;
    phone: string;
    university: string;
  };
}


