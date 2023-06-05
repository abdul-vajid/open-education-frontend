import React from 'react'

const SearchField: React.FC = () => {
  return (
    <div>
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-fade_text" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm bg-light_primary_bg text-fade_text rounded-lg w-80 dark:bg-dark_secondary_bg placeholder:text-fade_text outline-none placeholder:font-thin" placeholder="Search" />
      </div>
    </div>
  )
}

export default SearchField