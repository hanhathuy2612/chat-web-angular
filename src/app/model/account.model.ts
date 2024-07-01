export class Login {
  constructor(
    public username: string,
    public password: string,
    public rememberMe: boolean,
  ) {}
}

export class Account {
  constructor(
    public id: number,
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public imageUrl: string | null
  ) {
  }
}
