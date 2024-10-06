interface IInitialState{
    loggedInUser: IUser | null
}

interface IUser {
    id:string;
    username: string;
    createdAt: Date;
    credits: number;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    isSuspended: boolean;
    password?:string;
    dob: Date;
    email: string | null;
    phone: string | null;
  }
  