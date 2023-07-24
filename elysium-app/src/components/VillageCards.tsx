import React, { useEffect, useState } from 'react';
import { getVillages } from '../services/API';
import { Village } from '../models/Village';

function VillageCards() {
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const fetchedVillages = await getVillages();
        setVillages(fetchedVillages);
      } catch (error) {
        console.error(error);
		return <div>Error: there was an error fetching data </div>;
      }
    };

    fetchVillages();
  }, []);

  if (villages.length === 0) {
    return <div>Loading...</div>;
  }

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Villages</h2>

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{villages.map((village) => (
						<a href="#" className="group">
							<div key={village.id} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

								<img className="h-1/2 w-full object-cover object-center group-hover:opacity-75" src={village.imageUrl} alt={village.name} />
								
								<div className='flex-grow'>
									<h1 className="mt-1 text-sm text-gray-700">{village.name}</h1>
									<h2 className="mt-1 text-sm text-gray-700 py-10">{village.location}</h2>
									<p className='mt-1 text-lg font-medium text-gray-900'>{village.description}</p>
								</div>

								{/* {village.amenities.map((amenity) => (
									<span key={amenity.id}>
										<h3>{amenity.name}</h3>
										<p>{amenity.description}</p>
									</span>
								))} */}
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
		);
}

export default VillageCards;
