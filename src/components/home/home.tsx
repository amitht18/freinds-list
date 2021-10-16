import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useStore } from "../../state/state";
import { Friend, State } from "../../state/types";
import Contact from "../contact/contact";
import './home.scss'

import { FaUserAstronaut, FaAngleLeft, FaAngleRight, FaStar } from 'react-icons/fa';

const CONTACTS_PER_PAGE = 4;

function Home() {
    const friends = useStore((state: State) => state.friends);
    const addFriend = useStore((state: State) => state.addFriend);
    const updateSearchKey = useStore((state: State) => state.updateSearchTerm);
    const [addFriendName, updateAddFriendName] = useState<string>('')
    const [filteredFriends, updateFilteredFriends] = useState<Friend[]>([]);
    const [paginatedFriends, updatePaginatedFriends] = useState<Friend[]>([]);
    const [currentPage, updateCurrentPage] = useState<number>(1);
    const [totalPages, updateTotalPages] = useState<number>(0);
    const [sortByFav, updateSortByFav] = useState<boolean>(false);


    useEffect(() => {
        const ff = friends.filter((friend) => friend.name.toLowerCase().includes(addFriendName.toLowerCase()) && !friend.isDeleted)
        updateFilteredFriends(ff);
        updateTotalPages(Math.ceil(ff.length / CONTACTS_PER_PAGE))
    }, [friends, addFriendName])

    function handleNewFChange(e: ChangeEvent<HTMLInputElement>) {
        updateSearchKey(e.target.value);
        updateAddFriendName(e.target.value);
    }

    function onFormSubmit(f: FormEvent<HTMLFormElement>) {
        f.preventDefault();
        const newFriend: Friend = {
            name: addFriendName,
            isDeleted: false,
            isFavorite: false
        }
        if (nameIsValid(newFriend.name)) {
            addFriend(newFriend);
            updateAddFriendName('');
            updateSearchKey('')
        }
    }

    function nameIsValid(friendName: string): boolean {
        let isValid = true;
        if (friendName !== '') {
            friends.forEach((frien) => {
                if (frien.name.toLowerCase() === friendName.toLowerCase()) {
                    isValid = false
                }
                if (frien.name.toLowerCase() === friendName.toLowerCase() && frien.isDeleted) {
                    isValid = true
                }
            })
        } else if (friendName === '') {
            isValid = false;
        }
        return isValid;
    }

    useEffect(() => {
        updatePaginatedFriends(filteredFriends.slice(CONTACTS_PER_PAGE * (currentPage - 1), CONTACTS_PER_PAGE * (currentPage - 1) + 4))
    }, [filteredFriends, currentPage])

    useEffect(() => {
        if(sortByFav) {
            const sortedFiltered = filteredFriends.sort((x, y) => {
                return (x.isFavorite === y.isFavorite) ? 0 : x.isFavorite ? -1 : 1;
            });
            updatePaginatedFriends(sortedFiltered.slice(CONTACTS_PER_PAGE * (currentPage - 1), CONTACTS_PER_PAGE * (currentPage - 1) + 4))
        }
    }, [sortByFav, filteredFriends, currentPage])

    function goAhead() {
        if (currentPage < totalPages) {
            updateCurrentPage(currentPage + 1)
        }
    }

    function goBack() {
        if (currentPage > 1) {
            updateCurrentPage(currentPage - 1)
        }
    }

    function handleSortClick() {
        const update = !sortByFav;
        updateSortByFav(update);
    }

    return (
        <div className='friends-list'>
            <div className="friends-list__container">
                <h3 className="friends-list__container-header">Friends List</h3>
                <form onSubmit={(e) => onFormSubmit(e)}>
                    <input className="friends-list__container-search" type="text" name="new-friend" id="new-friend" value={addFriendName} placeholder="Enter your friend's name" onChange={(e) => handleNewFChange(e)} />
                    <span onClick={() => handleSortClick()} className={`friends-list__container-sort ${sortByFav ? 'active' : ''}`}>sort by<FaStar stroke='#444' strokeWidth='20px' fill='rgb(249, 206, 77)' /></span>
                </form>

                {paginatedFriends.length > 0 && <div className="friends-list__names">
                    {paginatedFriends.map((friend) => {
                        return <Contact friend={friend} />
                    })}

                </div>
                }
                {filteredFriends.length > 4 && <div className="pagination">
                    <span className='icon' onClick={() => goBack()}><FaAngleLeft /></span>
                    <span className='icon' onClick={() => goAhead()}><FaAngleRight /></span>
                </div>
                }
                {filteredFriends.length === 0 &&
                    <div className="friends-list__names-placeholder">
                        <div className="friends-list__names--empty">
                            <FaUserAstronaut size='48px' fill='#235788' />
                            <span className='friends-list__names--empty-text'>No results found for {addFriendName}, Hit Enter to add new friend</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;