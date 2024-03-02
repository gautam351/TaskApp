
namespace ServiceLAyer.Middlwares
{

    public class TestMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            Console.WriteLine("custom mIddleware");
           await   next.Invoke(context);
        }
    }

}