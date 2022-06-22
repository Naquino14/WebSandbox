using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebSandbox.Data;
using WebSandbox.Models;

namespace WebSandbox.Controllers
{
    public class JokesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public JokesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Jokes
        public async Task<IActionResult> Index()
        {
              return _context.Joke != null ? 
                          View(await _context.Joke.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Joke'  is null.");
        }
        
        // GET: Jokes/ShowSearchForm
        public IActionResult ShowSearchForm()
        {
            //return _context.Joke != null ?
            //            View(await _context.Joke.ToListAsync()) :
            //            Problem("Entity set 'ApplicationDbContext.Joke'  is null.");
            return View(); // the parameter for the target webpage is inferred based on the name of the method. neat!
            // this method was originally asynchronous but I made it synchronous :/
        }

        // POST: Jokes/ShowSearchResults
        // this isnt a GET because you cant GET what you didnt search :)
        public async Task<IActionResult> ShowSearchResults(string SearchPhrase) // note the name here must match the parameter defined in the name field of the button in the SearchForm form
            // also note that a lot of things can be returned. Not just generic tasks and AR interfaces.
        {
            return View("Index", await _context.Joke!.Where(x => x.JokeQuestion!.Contains(SearchPhrase)).ToListAsync());
            /// ok so a lot is happening here
            /// The Index page for the data model for a joke is returned.
            /// Where is from LINQ and it takes a lambda with a parameter named x.
            /// Hovering over x we can see it is of the type Joke.
            /// We can then access its JokeQuestion property to see if it contains the phrase we are looking for
        }


        // GET: Jokes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Joke == null)
            {
                return NotFound();
            }

            var joke = await _context.Joke
                .FirstOrDefaultAsync(m => m.ID == id);
            if (joke == null)
            {
                return NotFound();
            }

            return View(joke);
        }

        // GET: Jokes/Create
        [Authorize]
        // this makes it SUPER easy to require authorization before running an action.
        public IActionResult Create()
        {
            return View();
        }

        // POST: Jokes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize] // this action also requires authorization
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,JokeQuestion,JokeAnswer")] Joke joke)
        {
            if (ModelState.IsValid)
            {
                _context.Add(joke);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(joke);
        }

        // GET: Jokes/Edit/5
        [Authorize] // this action also requires authorization
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Joke == null)
            {
                return NotFound();
            }

            var joke = await _context.Joke.FindAsync(id);
            if (joke == null)
            {
                return NotFound();
            }
            return View(joke);
        }

        // POST: Jokes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize] // this action also requires authorization
        public async Task<IActionResult> Edit(int id, [Bind("ID,JokeQuestion,JokeAnswer")] Joke joke)
        {
            if (id != joke.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(joke);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!JokeExists(joke.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(joke);
        }

        // GET: Jokes/Delete/5
        [Authorize] // this action also requires authorization
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Joke == null)
            {
                return NotFound();
            }

            var joke = await _context.Joke
                .FirstOrDefaultAsync(m => m.ID == id);
            if (joke == null)
            {
                return NotFound();
            }

            return View(joke);
        }

        // POST: Jokes/Delete/5
        [Authorize] // this action also requires authorization
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Joke == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Joke'  is null.");
            }
            var joke = await _context.Joke.FindAsync(id);
            if (joke != null)
            {
                _context.Joke.Remove(joke);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool JokeExists(int id)
        {
          return (_context.Joke?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
