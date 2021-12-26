using Microsoft.EntityFrameworkCore;
using Rusada_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rusada_API.Repositories
{
    public class FlightSightingsRepository : IFlightSightingsRepository
    {
        public FlightSightingsRepository(FlightSightingsDBContecxt flightSightingsDBContecxt)
        {
            FlightSightingsDBContecxt = flightSightingsDBContecxt;
        }

        public FlightSightingsDBContecxt FlightSightingsDBContecxt { get; }

        public async Task<FlightSightings> Create(FlightSightings flights)
        {
          var result = await  FlightSightingsDBContecxt.FlightSightings.AddAsync(flights);
           await  FlightSightingsDBContecxt.SaveChangesAsync();
            return result.Entity;
        }

        public Task<FlightSightingsRepository> Create(FlightSightingsRepository flights)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(int id)
        {
            var result = await FlightSightingsDBContecxt.FlightSightings
                .FirstOrDefaultAsync(e => e.Id == id);

            if (result != null)
            {
                FlightSightingsDBContecxt.FlightSightings.Remove(result);
                await FlightSightingsDBContecxt.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FlightSightings>> GetAll()
        {
            return await FlightSightingsDBContecxt.FlightSightings.ToListAsync();
        }

        public async Task<FlightSightings> Get(int id)
        {
            return await FlightSightingsDBContecxt.FlightSightings
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<FlightSightings>> Search(string Make, string Model)
        {
            IQueryable<FlightSightings> query = FlightSightingsDBContecxt.FlightSightings;

            if (!string.IsNullOrEmpty(Make))
            {
                query = query.Where(e => e.Make.Contains(Make)
                            || e.Model.Contains(Model));
            }

            if (Model != null)
            {
                query = query.Where(e => e.Model == Model);
            }

            return await query.ToListAsync();
        }


        public async Task<FlightSightings> Update(FlightSightings flightSightings)
        {
            var result = await FlightSightingsDBContecxt.FlightSightings
                .FirstOrDefaultAsync(e => e.Id == flightSightings.Id);

            if (result != null)
            {
                result.Make = flightSightings.Make;
                result.Model = flightSightings.Model;
                result.Registration = flightSightings.Registration;
                result.Location = flightSightings.Location;
                result.DateAndTime = flightSightings.DateAndTime;
                result.AircraftPhoto = flightSightings.AircraftPhoto;

                if (flightSightings.Id != 0)
                {
                    result.Id = flightSightings.Id;
                }
             
                result.AircraftPhoto = flightSightings.AircraftPhoto;

                await FlightSightingsDBContecxt.SaveChangesAsync();

                return result;
            }

            return null;
        }

       
    }
}
