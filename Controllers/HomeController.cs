using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using blog.Services;

namespace blog.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            MailService.SendMessage();
            return View();

        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
