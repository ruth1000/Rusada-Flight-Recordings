using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rusada_API.Models;
using Rusada_API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rusada_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightSightsController : ControllerBase
    {
        private readonly IFlightSightingsRepository flightSightingsRepository;

        public FlightSightsController(IFlightSightingsRepository flightSightingsRepository)
        {
            this.flightSightingsRepository = flightSightingsRepository;
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<FlightSightings>>> Search(string make, string model)
        {
            try
            {
                var result = await flightSightingsRepository.Search(make, model);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetFlightSightingss()
        {
            try
            {
                return Ok(await flightSightingsRepository.GetAll());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<FlightSightings>> GetFlightSightings(int id)
        {
            try
            {
                var result = await flightSightingsRepository.Get(id);

                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public async Task<ActionResult<FlightSightings>> CreateFlightSightings(FlightSightings FlightSightings)
        {
            try
            {
                if (FlightSightings == null)
                    return BadRequest();

                var result = await flightSightingsRepository.Get(FlightSightings.Id);

                if (result != null)
                {
                    ModelState.AddModelError("Sighting", "Flight already Recorded");
                    return BadRequest(ModelState);
                }

                var createdFlightSightings = await flightSightingsRepository.Create(FlightSightings);

                return CreatedAtAction(nameof(GetFlightSightings),
                    new { id = createdFlightSightings.Id }, createdFlightSightings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new FlightSightings record");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<FlightSightings>> UpdateFlightSightings(int id, FlightSightings flightSightings)
        {
            try
            {
                if (id != flightSightings.Id)
                    return BadRequest("FlightSightings ID mismatch");

                var FlightSightingsToUpdate = await flightSightingsRepository.Get(id);

                if (FlightSightingsToUpdate == null)
                {
                    return NotFound($"FlightSightings with Id = {id} not found");
                }

                return await flightSightingsRepository.Update(flightSightings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating FlightSightings record");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteFlightSightings(int id)
        {
            try
            {
                var FlightSightingsToDelete = await flightSightingsRepository.Get(id);

                if (FlightSightingsToDelete == null)
                {
                    return NotFound($"FlightSightings with Id = {id} not found");
                }

                await flightSightingsRepository.Delete(id);

                return Ok($"FlightSightings with Id = {id} deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting FlightSightings record");
            }
        }

        //[NonAction]
        //public string (IFormFile imagefile, HttpContext HttpContext)
        //    {

        //    }
        }
    }

