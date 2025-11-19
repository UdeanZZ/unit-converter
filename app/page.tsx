"use client";

import type React from "react";
import { useState } from "react";

type Tab = "length" | "weight" | "temperature";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("length");
  const [result, setResult] = useState<{
    type: Tab;
    value: number;
    from: string;
    to: string;
    result: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    type: Tab
  ) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const value = formData.get("value");
    const from = formData.get("from");
    const to = formData.get("to");

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value, from, to }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error ?? "Conversion failed");
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (_) {
      setError("Unable to reach the server. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-16 sm:px-10 sm:py-20">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Backend Practice Project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Unit Converter
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            Convert between common units of length, weight, and temperature. Use
            the tabs below to switch between converters. Each converter has its
            own form that can be submitted to this page.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 rounded-full border border-zinc-200 bg-white p-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setActiveTab("length")}
            className={`${
              activeTab === "length"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            } rounded-full px-4 py-1.5 transition`}
          >
            Length
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("weight")}
            className={`${
              activeTab === "weight"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            } rounded-full px-4 py-1.5 transition`}
          >
            Weight
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("temperature")}
            className={`${
              activeTab === "temperature"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            } rounded-full px-4 py-1.5 transition`}
          >
            Temperature
          </button>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {activeTab === "length" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Length converter</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Convert between millimeter, centimeter, meter, kilometer,
                  inch, foot, yard, and mile.
                </p>
              </div>
              <form
                className="space-y-4"
                onSubmit={(event) => handleSubmit(event, "length")}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    step="any"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    From unit
                  </label>
                  <select
                    name="from"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="meter"
                  >
                    <option value="millimeter">Millimeter</option>
                    <option value="centimeter">Centimeter</option>
                    <option value="meter">Meter</option>
                    <option value="kilometer">Kilometer</option>
                    <option value="inch">Inch</option>
                    <option value="foot">Foot</option>
                    <option value="yard">Yard</option>
                    <option value="mile">Mile</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    To unit
                  </label>
                  <select
                    name="to"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="kilometer"
                  >
                    <option value="millimeter">Millimeter</option>
                    <option value="centimeter">Centimeter</option>
                    <option value="meter">Meter</option>
                    <option value="kilometer">Kilometer</option>
                    <option value="inch">Inch</option>
                    <option value="foot">Foot</option>
                    <option value="yard">Yard</option>
                    <option value="mile">Mile</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading && result?.type === "length"
                      ? "Converting..."
                      : "Convert length"}
                  </button>
                </div>
              </form>
              {error && (!result || result.type === "length") && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}
              {result && result.type === "length" && !error && (
                <div className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                  <p>
                    {result.value} {result.from} ={" "}
                    <span className="font-semibold">{result.result}</span>{" "}
                    {result.to}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "weight" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Weight converter</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Convert between milligram, gram, kilogram, ounce, and pound.
                </p>
              </div>
              <form
                className="space-y-4"
                onSubmit={(event) => handleSubmit(event, "weight")}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    step="any"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    From unit
                  </label>
                  <select
                    name="from"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="kilogram"
                  >
                    <option value="milligram">Milligram</option>
                    <option value="gram">Gram</option>
                    <option value="kilogram">Kilogram</option>
                    <option value="ounce">Ounce</option>
                    <option value="pound">Pound</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    To unit
                  </label>
                  <select
                    name="to"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="gram"
                  >
                    <option value="milligram">Milligram</option>
                    <option value="gram">Gram</option>
                    <option value="kilogram">Kilogram</option>
                    <option value="ounce">Ounce</option>
                    <option value="pound">Pound</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading && result?.type === "weight"
                      ? "Converting..."
                      : "Convert weight"}
                  </button>
                </div>
              </form>
              {error && (!result || result.type === "weight") && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}
              {result && result.type === "weight" && !error && (
                <div className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                  <p>
                    {result.value} {result.from} ={" "}
                    <span className="font-semibold">{result.result}</span>{" "}
                    {result.to}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "temperature" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Temperature converter</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Convert between Celsius, Fahrenheit, and Kelvin.
                </p>
              </div>
              <form
                className="space-y-4"
                onSubmit={(event) => handleSubmit(event, "temperature")}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    step="any"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    From unit
                  </label>
                  <select
                    name="from"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="celsius"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                    <option value="kelvin">Kelvin (K)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="w-full text-sm font-medium sm:w-32">
                    To unit
                  </label>
                  <select
                    name="to"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                    defaultValue="fahrenheit"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                    <option value="kelvin">Kelvin (K)</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading && result?.type === "temperature"
                      ? "Converting..."
                      : "Convert temperature"}
                  </button>
                </div>
              </form>
              {error && (!result || result.type === "temperature") && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}
              {result && result.type === "temperature" && !error && (
                <div className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                  <p>
                    {result.value} {result.from} ={" "}
                    <span className="font-semibold">{result.result}</span>{" "}
                    {result.to}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
