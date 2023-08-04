import React, { useEffect, useState } from 'react';
import { getVillages, addToFaves, getUser } from '../services/API';
import { Village } from '../models/Village';
import { StarIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { User } from '../models/User';
import { forEachChild } from 'typescript';


const Compare: React.FC = () => {
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const fetchedVillages = await getVillages();
        const user = await getUser(Cookies.get('username') ?? "");
        const userVillages = user.villages;
        const faveVillages = [];
        
        console.log("userVillages =", userVillages);
        console.log("fetchedVillages =", fetchedVillages);

        for (let i = 0; i < fetchedVillages.length; i++) {
            for (let j = 0; j < userVillages.length; j++) {
                if (fetchedVillages[i].id === userVillages[j].id){
                  faveVillages.push(fetchedVillages[i]);
                }
            }
        }

        console.log("faveVillages =", faveVillages);
        setVillages(faveVillages);

      } catch (error) {
        console.error(error);
        return <div>Error: there was an error fetching data </div>;
      }
    };

    fetchVillages();
  }, []);

  	const handleAddToFaves = async (id: number) => {
		try {
			const user = Cookies.get('username') ?? "";

			if (user === "" ){
				alert("You must be logged in to add to favorites");
				return;
			}
			
			addToFaves(id,user);

		} catch (error) {
			console.log('Error adding to favorites');
		}
	};

  if (villages.length === 0) {
    return <div>Loading...</div>;
  }
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Villages</h2>

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
					{villages.map((village) => (
						<div key={village.id} className="group aspect-h-1 aspect-w-1 w-full overflow-hidden shadow-xl hover:shadow-2xl rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
						<div className="block w-full h-full">


								<img className="h-1/2 w-full object-cover object-center " src={village.imageUrl} alt={village.name} />


								<button
									type="button"
									onClick={() => handleAddToFaves(village.id)}
									className="rounded-full float-right p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
								>
									<span className="sr-only">View Favorites</span>
									<StarIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								<h1 className=" text-gray-700">{village.name}</h1>
								<h2 className=" text-gray-700 py-10">{village.location}</h2>
								<p className=' text-gray-700'>{village.description}</p>

						</div>
					</div>
				))}
				</div>
			</div>
		</div>
	);
}

export default Compare;