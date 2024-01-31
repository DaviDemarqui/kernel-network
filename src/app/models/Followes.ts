export class Followers {
    follower_id: any;
    following_id: any;
    created_at: Date;

    constructor(follower_id: any, following_id: any) {
        this.follower_id = follower_id;
        this.following_id = following_id;
    }
}