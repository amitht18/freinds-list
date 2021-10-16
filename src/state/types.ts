export interface State {
    friends: Friend[];
    searchTerm: string;
    updateSearchTerm: (searchString: string) => void;
    addFriend: (friend: Friend) => void;
    favAFriend: (friend: Friend) => void;
    deleteFriend: (friend: Friend) => void;
}

export interface Friend {
    name: string;
    isFavorite: boolean;
    isDeleted: boolean;
}