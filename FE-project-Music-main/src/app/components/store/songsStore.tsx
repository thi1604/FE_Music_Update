import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type SongStore = {
  songsSlug: string[];
  changeInfo: string,
  isRepeat: boolean;
  addSong: (name: string) => void;
  removeLastSong: () => void;
  getSong: () => void;
  setRepeat: (value: boolean) => void;
  getRepeat: () => boolean;
  setChangeUser: (value: string) => void;
  getChangeUser: () => string;
};

const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      songsSlug: [],
      changeInfo: "",
      isRepeat: false,
      addSong: (name: any) => set((state: any) => ({ songsSlug: [...state.songsSlug, name] })),
      removeLastSong: () =>
        set((state: any) =>
          state.songsSlug.length > 1 ? { songsSlug: state.songsSlug.slice(0, -1) } : state
        ),
      getSong: () => {
        const { songsSlug } = get(); // Lấy danh sách bài hát hiện tại
        return songsSlug.length > 0 ? songsSlug[songsSlug.length - 1] : null;
      },
      setRepeat: (value: boolean) => set(() => ({isRepeat : value})),
      getRepeat: () => get().isRepeat,
      setChangeUser: (value: string) => set(() => ({changeInfo : value})),
      getChangeUser: () => get().changeInfo,
    }),
    {
      name: 'song-storage',
      storage: {
        getItem: (name) => sessionStorage.getItem(name), // Lấy dữ liệu từ sessionStorage
        setItem: (name, value: any) => sessionStorage.setItem(name, value), // Lưu vào sessionStorage
        removeItem: (name) => sessionStorage.removeItem(name), // Xóa khỏi sessionStorage
      },
    } as PersistOptions <SongStore>
  )
);

export default useSongStore;