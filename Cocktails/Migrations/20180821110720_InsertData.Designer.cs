﻿// <auto-generated />
using System;
using Cocktails.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Cocktails.Migrations
{
    [DbContext(typeof(CocktailsContext))]
    [Migration("20180821110720_InsertData")]
    partial class InsertData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Cocktails.Models.Cocktail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Image");

                    b.Property<string>("Instructions");

                    b.Property<string>("Name");

                    b.Property<string>("WikipediaArticleUri");

                    b.HasKey("ID");

                    b.ToTable("Cocktails");
                });

            modelBuilder.Entity("Cocktails.Models.Ingredient", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("Cocktails.Models.RecipeRow", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CocktailID");

                    b.Property<int?>("IngredientID");

                    b.Property<int>("Unit");

                    b.HasKey("ID");

                    b.HasIndex("CocktailID");

                    b.HasIndex("IngredientID");

                    b.ToTable("RecipeRow");
                });

            modelBuilder.Entity("Cocktails.Models.RecipeRow", b =>
                {
                    b.HasOne("Cocktails.Models.Cocktail")
                        .WithMany("RecipeRows")
                        .HasForeignKey("CocktailID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cocktails.Models.Ingredient", "Ingredient")
                        .WithMany()
                        .HasForeignKey("IngredientID");
                });
#pragma warning restore 612, 618
        }
    }
}
