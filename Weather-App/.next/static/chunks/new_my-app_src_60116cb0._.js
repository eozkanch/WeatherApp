(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/new/my-app/src/components/WeatherCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WeatherCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$rain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudRain$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/cloud-rain.js [app-client] (ecmascript) <export default as CloudRain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$snow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudSnow$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/cloud-snow.js [app-client] (ecmascript) <export default as CloudSnow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$drizzle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudDrizzle$3e$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/lucide-react/dist/esm/icons/cloud-drizzle.js [app-client] (ecmascript) <export default as CloudDrizzle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function WeatherCard({ data, onCityChange }) {
    _s();
    const [showCityInput, setShowCityInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cityInput, setCityInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Get weather icon based on condition
    const getWeatherIcon = (condition, size = "w-8 h-8")=>{
        if (!condition) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            className: size
        }, void 0, false, {
            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
            lineNumber: 18,
            columnNumber: 28
        }, this);
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 22,
                columnNumber: 14
            }, this);
        }
        if (conditionLower.includes('partly cloudy') || conditionLower.includes('overcast')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$drizzle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudDrizzle$3e$__["CloudDrizzle"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 25,
                columnNumber: 14
            }, this);
        }
        if (conditionLower.includes('cloud')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, this);
        }
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$rain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudRain$3e$__["CloudRain"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 31,
                columnNumber: 14
            }, this);
        }
        if (conditionLower.includes('snow')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$snow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudSnow$3e$__["CloudSnow"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 34,
                columnNumber: 14
            }, this);
        }
        if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                className: size
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            className: size
        }, void 0, false, {
            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
            lineNumber: 39,
            columnNumber: 12
        }, this);
    };
    // Handle city change
    const handleCitySubmit = (e)=>{
        e.preventDefault();
        if (cityInput.trim() && onCityChange) {
            onCityChange(cityInput.trim());
            setCityInput("");
            setShowCityInput(false);
        }
    };
    // Get current hour and next 6 hours
    const getCurrentAndNextHours = ()=>{
        if (!data?.forecast?.forecastday?.[0]?.hour) return [];
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const allHours = data.forecast.forecastday[0].hour;
        return allHours.slice(currentHour, currentHour + 7).map((hour, index)=>{
            const time = new Date(hour.time);
            const displayTime = index === 0 ? "Now" : `${time.getHours().toString().padStart(2, '0')}:00`;
            return {
                time: displayTime,
                temp: Math.round(hour.temp_c),
                icon: getWeatherIcon(hour.condition.text, "w-6 h-6")
            };
        });
    };
    // Daily forecast data from API
    const getDailyForecast = ()=>{
        if (!data?.forecast?.forecastday) return [];
        const dayNames = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        return data.forecast.forecastday.slice(0, 3).map((day, index)=>{
            const date = new Date(day.date);
            const dayName = index === 0 ? "Today" : dayNames[date.getDay()];
            return {
                day: dayName,
                minTemp: Math.round(day.day.mintemp_c),
                maxTemp: Math.round(day.day.maxtemp_c),
                icon: getWeatherIcon(day.day.condition.text, "w-8 h-8")
            };
        });
    };
    const hours = getCurrentAndNextHours();
    const days = getDailyForecast();
    // Get high/low for today
    const todayForecast = data?.forecast?.forecastday?.[0]?.day;
    const highTemp = todayForecast ? Math.round(todayForecast.maxtemp_c) : null;
    const lowTemp = todayForecast ? Math.round(todayForecast.mintemp_c) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col text-white overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 flex flex-col h-full px-6 py-8 overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowCityInput(!showCityInput),
                        className: "text-white text-sm opacity-70 hover:opacity-100 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm",
                        children: "Change City"
                    }, void 0, false, {
                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                showCityInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleCitySubmit,
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: cityInput,
                                onChange: (e)=>setCityInput(e.target.value),
                                placeholder: "Enter city name...",
                                className: "flex-1 px-4 py-2 bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/30 focus:border-white/50 focus:outline-none placeholder-white/60"
                            }, void 0, false, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "px-4 py-2 bg-white/30 text-white rounded-xl hover:bg-white/40 backdrop-blur-sm",
                                children: "OK"
                            }, void 0, false, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-light tracking-wide",
                        children: data?.location?.name || "Geneva"
                    }, void 0, false, {
                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                data?.current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-8xl font-thin",
                                children: [
                                    Math.round(data.current.temp_c),
                                    "°"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-light",
                                children: data.current.condition?.text || "Unknown"
                            }, void 0, false, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this),
                        highTemp !== null && lowTemp !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-light",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/90",
                                        children: [
                                            "↑ ",
                                            highTemp,
                                            "°"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 163,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-2 text-white/90",
                                        children: [
                                            "↓ ",
                                            lowTemp,
                                            "°"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 164,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 162,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                            lineNumber: 161,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true),
                hours.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center overflow-x-auto gap-4 pb-2",
                        children: hours.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center min-w-[60px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-light mb-2",
                                        children: h.time
                                    }, void 0, false, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 179,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2",
                                        children: h.icon
                                    }, void 0, false, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 180,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-medium",
                                        children: [
                                            h.temp,
                                            "°"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 181,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                lineNumber: 178,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                        lineNumber: 176,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                    lineNumber: 175,
                    columnNumber: 11
                }, this),
                days.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 mr-2",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs uppercase tracking-wider opacity-70",
                                    children: "3-Day Forecast"
                                }, void 0, false, {
                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: days.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between py-2 border-b border-white/10 last:border-b-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base font-light w-12",
                                            children: d.day
                                        }, void 0, false, {
                                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex justify-center",
                                            children: d.icon
                                        }, void 0, false, {
                                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 text-base",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "opacity-60",
                                                    children: [
                                                        d.minTemp,
                                                        "°"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        d.maxTemp,
                                                        "°"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
                    lineNumber: 190,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/new/my-app/src/components/WeatherCard.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(WeatherCard, "WQQhkOS0mzfiL/WQveWf5rmz6P4=");
_c = WeatherCard;
var _c;
__turbopack_context__.k.register(_c, "WeatherCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/new/my-app/src/lib/weather-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWeatherData",
    ()=>fetchWeatherData,
    "getBackgroundImage",
    ()=>getBackgroundImage,
    "isDay",
    ()=>isDay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_KEY = "35555b2c72ac4a89bf1222251221705";
const fetchWeatherData = async (cityName)=>{
    if (!cityName.trim()) {
        throw new Error('City name is required');
    }
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=no`);
        return response.data;
    } catch (error) {
        console.error('Weather API Error:', error);
        throw new Error('City not found. Please enter a valid city name.');
    }
};
const isDay = (localtime)=>{
    const hour = new Date(localtime).getHours();
    return hour >= 6 && hour < 20; // 6:00 - 20:00 arası gündüz
};
const getBackgroundImage = (condition, localtime)=>{
    if (!condition) {
        return isDay(localtime) ? '/bg-images/general day.jpg' : '/bg-images/general night.jpg';
    }
    const conditionLower = condition.toLowerCase();
    const isDaytime = isDay(localtime);
    // Clear / Sunny
    if (conditionLower.includes('clear')) {
        return isDaytime ? '/bg-images/clear day.jpg' : '/bg-images/clear night sky.jpg';
    }
    if (conditionLower.includes('sunny')) {
        return '/bg-images/Sunny.jpg'; // Sunny için özel dosya
    }
    // Cloudy
    if (conditionLower.includes('cloudy') && !conditionLower.includes('partly')) {
        return isDaytime ? '/bg-images/Cloudy day sky-.jpg' : '/bg-images/cloudy night sky.jpg';
    }
    // Overcast / Partly Cloudy
    if (conditionLower.includes('overcast') || conditionLower.includes('partly')) {
        return isDaytime ? '/bg-images/Overcast day .jpg' : '/bg-images/Overcast night.jpg';
    }
    // Rain / Drizzle
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        return isDaytime ? '/bg-images/Rainy day.jpg' : '/bg-images/Rainy night.jpg';
    }
    // Snow
    if (conditionLower.includes('snow')) {
        return isDaytime ? '/bg-images/Snow day.jpg' : '/bg-images/snow night.jpg';
    }
    // Storm / Thunder
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
        return isDaytime ? '/bg-images/storm day .jpg' : '/bg-images/Storm night.jpg';
    }
    // Varsayılan
    return isDaytime ? '/bg-images/general day.jpg' : '/bg-images/general night.jpg';
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/new/my-app/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$src$2f$components$2f$WeatherCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/src/components/WeatherCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$src$2f$lib$2f$weather$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/new/my-app/src/lib/weather-api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bgImage, setBgImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('/bg-images/general day.jpg');
    const loadWeatherData = async (cityName)=>{
        setLoading(true);
        setError(null);
        try {
            const weatherData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$src$2f$lib$2f$weather$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWeatherData"])(cityName);
            setData(weatherData);
            // Arkaplan resmini güncelle
            if (weatherData?.current?.condition?.text && weatherData?.location?.localtime) {
                const newBgImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$src$2f$lib$2f$weather$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBackgroundImage"])(weatherData.current.condition.text, weatherData.location.localtime);
                setBgImage(newBgImage);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Load Geneva by default
            loadWeatherData('Geneva');
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen flex items-center justify-center overflow-hidden relative",
        style: {
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full h-full max-w-md mx-auto",
                children: data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$src$2f$components$2f$WeatherCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    data: data,
                    onCityChange: loadWeatherData
                }, void 0, false, {
                    fileName: "[project]/new/my-app/src/app/page.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/app/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 left-1/2 transform -translate-x-1/2 z-20 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm",
                children: error
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/app/page.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg p-4 flex items-center space-x-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/app/page.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$new$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-700 text-sm",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/new/my-app/src/app/page.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/new/my-app/src/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/new/my-app/src/app/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/new/my-app/src/app/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(Home, "3VJtfkT+BMMmUIT0vrcYEj+BpGI=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=new_my-app_src_60116cb0._.js.map