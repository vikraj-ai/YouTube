import React from 'react';
import { Menu, Bell, UserCircle, BookOpen, Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onMenuClick }) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="hover:bg-gray-100 p-2 rounded-full">
            <Menu className="h-6 w-6 cursor-pointer" />
          </button>
          <div className="flex items-center gap-1">
            <BookOpen className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold">EdTube</span>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              name="search"
              type="text"
              placeholder="Search educational content"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="absolute right-3 top-2.5">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4">
          <Bell className="h-6 w-6 cursor-pointer" />
          <UserCircle className="h-8 w-8 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;