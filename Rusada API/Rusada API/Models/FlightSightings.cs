using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Rusada_API.Models
{
    [Table(name: "FlightSightings")]
    public class FlightSightings
    {

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(128, ErrorMessage = "Maximum length cannot exceed 128 Characters")]
        public string Make { get; set; }

        [Required]
        [StringLength(128, ErrorMessage = "Maximum length cannot exceed 128 Characters")]
        public string Model { get; set; }

        [Required]       
        public string Registration { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "Maximum length cannot exceed 255 Characters")]
        public string Location { get; set; }

        [Required]
        public DateTime DateAndTime { get; set; }

        public string AircraftPhoto { get; set; }

        //[NotMapped]
        //public (IFormFile) AircraftImage { get; set; }    }
    }
}
