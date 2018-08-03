﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Cocktails.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/sitecss").Include("~/Content/Css/site.css", "~/Content/Css/icomoon/style.css"));
            bundles.Add(new ScriptBundle("~/dist/bundle").Include("~/dist/main.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}