using Microsoft.EntityFrameworkCore;
using Rusada_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories
{
    public class FlightSightingsRepository : IFlightSightingsRepository
    {
        public FlightSightingsRepository(FlightSightingsDBContecxt flightSightingsDBContecxt)
        {
            FlightSightingsDBContecxt = flightSightingsDBContecxt;
        }

        public FlightSightingsDBContecxt FlightSightingsDBContecxt { get; }

        public async Task<FlightSightingsRepository> Create(FlightSightings flights)
        {
          var result = await  FlightSightingsDBContecxt.FlightSightings.AddAsync(flights);
           await  FlightSightingsDBContecxt.SaveChangesAsync();
            return result.Entity;
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FlightSightingsRepository>> Get()
        {
            throw new NotImplementedException();
        }

        public Task<FlightSightingsRepository> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task Update(FlightSightingsRepository flights)
        {
            throw new NotImplementedException();
        }
    }
}
