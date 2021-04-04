
export class UserReturnDto {
	id: number;
	username: string;
	email: string;
	jwt: string;

	constructor(id: number, username: string, email: string, jwt: string) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.jwt = jwt;
	}
}
