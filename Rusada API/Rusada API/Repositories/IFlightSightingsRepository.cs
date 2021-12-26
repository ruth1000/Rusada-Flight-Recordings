using Rusada_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Rusada_API.Repositories
{
   public interface IFlightSightingsRepository
    {
        Task<IEnumerable<FlightSightings>> Search(string make, string model);
        Task<IEnumerable<FlightSightings>> GetAll();
        Task<FlightSightings> Get(int id);
        Task<FlightSightings> Create(FlightSightings flightSightings);
        Task<FlightSightings> Update(FlightSightings flightSightings);
        Task Delete(int id);
    }
}
