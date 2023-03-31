
import { User } from '../../DB/models/user';

declare global{
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

