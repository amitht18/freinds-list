import create from 'zustand'
import { mockData } from '../mock-data/data'
import { Friend, State } from './types'

export const useStore = create<State>(set => ({
    friends: mockData,
    searchTerm: '',
    addFriend: (friend: Friend) => set(state => ({friends: [...state.friends, friend]})),
    updateSearchTerm: (searchString: string) => set(state => ({searchTerm: searchString})),
    deleteFriend: (friend: Friend) => set(state => ({friends: 
        state.friends.map(fr => {
            if(fr.name === friend.name) {
                return {
                    ...fr, isDeleted: true
                }
            } else {
                return fr;
            }
        })
    })),
    favAFriend: (friend: Friend) => set(state => ({friends: 
        state.friends.map(fr => {
            if(fr.name === friend.name) {
                return {
                    ...fr, isFavorite: !fr.isFavorite
                }
            } else {
                return fr;
            }
        })
    }))
}))