using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rusada 

namespace Data_Access_Layer.Repositories
{
   public interface IFlightSightingsRepository
    {
        Task<IEnumerable<FlightSightingsRepository>> Get();
        Task<FlightSightingsRepository> Get(int id);
        Task<FlightSightingsRepository> Create(FlightSightingsRepository flights);
        Task Update(FlightSightingsRepository flights);
        Task Delete(int id);
    }
}
