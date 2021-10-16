import { Friend, State } from "../../state/types";
import { FaStar, FaTrash } from 'react-icons/fa';
import './contact.scss';
import { useStore } from "../../state/state";

interface Props {
    friend: Friend;
}

function Contact(props: Props) {
    const favFriend = useStore((state: State) => state.favAFriend);
    const delFriend = useStore((state: State) => state.deleteFriend);
    return (
        <div className='contact-card'>
            <div className="contact-card__info">
                <p className='contact-card__name'>{props.friend.name}</p>
                <span className='contact-card__name--label'>is your friend</span>
            </div>
            <div className="contact-card__actions">
                <span className='contact-card__icon favorite' onClick={() => favFriend(props.friend)}><FaStar stroke='#444' strokeWidth='20px' color={`${props.friend.isFavorite ? 'rgb(249, 206, 77)' : 'transparent'}`} /></span>
                <span className='contact-card__icon trash' onClick={() => delFriend(props.friend)}><FaTrash stroke='#444' strokeWidth='20px' color='transparent' /></span>
            </div>
        </div>
    )
}

export default Contact;
