app
    .factory('NBACourt', function() {
        return {
            "lines": [

                    {
                        "x1": 0.5, "x2": 0.5, "y1": 0, "y2": 1,
                        "stroke": "#000000", "stroke-width": 2,
                        "id": "division-line"
                    },
                    {
                        "x1": 0, "x2": 0.2, "y1": 0.38, "y2": 0.38,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "inner-lane"
                    },
                    {
                        "x1": 1, "x2": 0.8, "y1": 0.38, "y2": 0.38,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "inner-lane"
                    },
                    {
                        "x1": 0, "x2": 0.2, "y1": 0.62, "y2": 0.62,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "inner-lane"
                    },
                    {
                        "x1": 1, "x2": 0.8, "y1": 0.62, "y2": 0.62,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "inner-lane"
                    },
                    {
                        "x1": 0, "x2": 0.13, "y1": 0.94, "y2": 0.94,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "three-pt-arc"
                    },
                    {
                        "x1": 0, "x2": 0.13, "y1": 0.06, "y2": 0.06,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "three-pt-arc"
                    },
                    {
                        "x1": 1, "x2": 0.87, "y1": 0.94, "y2": 0.94,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "three-pt-arc"
                    },
                    {
                        "x1": 1, "x2": 0.87, "y1": 0.06, "y2": 0.06,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "three-pt-arc"
                    },
                    {
                        "x1": 0, "x2": 0.2, "y1": 0.34, "y2": 0.34,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "outer-lane"
                    },
                    {
                        "x1": 0, "x2": 0.2, "y1": 0.66, "y2": 0.66,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "outer-lane"
                    },
                    {
                        "x1": 1, "x2": 0.8, "y1": 0.34, "y2": 0.34,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "outer-lane"
                    },
                    {
                        "x1": 1, "x2": 0.8, "y1": 0.66, "y2": 0.66,
                        "stroke": "#000000", "stroke-width": 1,
                        "id": "outer-lane"
                    },
                    {
                        "x1": 0.2, "x2": 0.2, "y1": 0.66, "y2": 0.34,
                        "stroke": "#000000", "stroke-width": 1
                    },
                    {
                        "x1": 0.8, "x2": 0.8, "y1": 0.66, "y2": 0.34,
                        "stroke": "#000000", "stroke-width": 1
                    }
            ],
            "circles": [
                {
                    "cx": 0.5, "cy": 0.5, "r": 0.12
                },
                {
                    "cx": 0.2, "cy":0.5, "r": 0.12
                },
                {
                    "cx": 0.8, "cy":0.5, "r": 0.12
                },
                {
                    "cx": 0.0372, "cy": 0.5, "r": 0.475
                },
                {
                    "cx": 0.9628, "cy": 0.5, "r": 0.475
                }
            ]
        }
    });
