import React from 'react'

function AddMovie() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6">
            <h1 className="text-3xl font-bold text-center mb-8">Movie Panel</h1>

            <div className="w-full max-w-xl bg-white text-black p-8 rounded-lg shadow-lg">
                <form className="flex flex-col gap-4">
                    <label htmlFor="profilePic" className="font-semibold text-lg">Upload Image</label>
                    <input
                        type="file"
                        name="profilePic"
                        id="profilePic"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="title" className="font-semibold text-lg">Movie Title</label>
                    <input
                        type="text"
                        placeholder="Enter movie title"
                        id="title"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="description" className="font-semibold text-lg">Movie Description</label>
                    <input
                        type="text"
                        placeholder="Enter movie description"
                        name="description"
                        id="description"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="genre" className="font-semibold text-lg">Genre</label>
                    <input
                        type="text"
                        placeholder="Enter genre"
                        name="genre"
                        id="genre"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="language" className="font-semibold text-lg">Language</label>
                    <input
                        type="text"
                        placeholder="Enter movie language"
                        name="language"
                        id="language"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="rating" className="font-semibold text-lg">Rating</label>
                    <input
                        type="number"
                        placeholder="Enter rating"
                        name="rating"
                        id="rating"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="duration" className="font-semibold text-lg">Duration (minutes)</label>
                    <input
                        type="number"
                        placeholder="Enter duration"
                        name="duration"
                        id="duration"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="releaseDate" className="font-semibold text-lg">Release Date</label>
                    <input
                        type="date"
                        name="releaseDate"
                        id="releaseDate"
                        className="p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                    >
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddMovie
