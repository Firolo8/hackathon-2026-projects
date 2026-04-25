class CasualEngine: 
    """ 
    Multiplicative casual risk engine Adjusts disease probability based on lifestyle factors
    """

    def  calculate_risk(self, base_probability, lifestyle_factors, disease): 
        """ 
        Calculate adjusted disease probability based on lifestyle factors
        Args:
            base_probability (float): Base probability of disease (0-1)
            lifestyle_factors (dict): Dictionary of lifestyle factors and their impact on risk
            disease (str): Name of the disease to calculate risk for
        Returns:
            float: Adjusted probability of disease (0-1)
        """
        risk = base_probability
        factors = [] 
        recommendations =[] 

        #Smoking (40% increase in risk) 
        if lifestyle_factors.get('smoking', False): 
            multiplier = 1.4 
            risk *= multiplier
            factors.append({ 
                'name': 'Smoking',
                'impact': '+40%',
                'description': 'Smoking signifincantly increases disease risk' 
            })
            recommendations.append ('Quit smoking to reduce risk by 40%')


            #Poor sleep ( <5 hrs = 20% increase in risk)
            sleep_hours = lifestyle_factors.get('sleep_hours', 7) 
            if sleep_hours < 5: 
                multiplier = 1.2 
                risk *= multiplier
                factors.append({ 
                    'name': 'Poor Sleep',
                    'impact': '+20%',
                    'description': f'Sleeping less than 5 hours increases risk by 20% (Current: {sleep_hours} hrs)' 
                })
                recommendations.append('Aim for 7-8 hours of sleep to reduce risk by 20%')


            #High pollution (25% increase) 
            pollution = lifestyle_factors.get('pollution', 'low') 
            if pollution -- 'high': 
                multiplier = 1.25
                risk *= multiplier 
                factors.append({ 
                    'name': 'High Pollution',
                    'impact': '+25%',
                    'description': 'Exposure to high pollution increases risk by 25%' 
                })
                recommendations.append('Reduce pollution exposure to lower risk y 25%')
            elif pollution == 'medium': 
                multiplier = 1.1 
                risk *= multiplier
                factors.append({ 
                    'name': 'Medium Pollution', 
                    'impact': '+10%',
                    'description': 'Exposure to medium pollution increases risk by 10%'
                })
                recommendations.append('Reduce pollution exposure to lower risk ')

                #Capping risk at 95% 
                risk = min(risk, 0.95) 

                #Determine severity
                severity = self._get_severity(risk)

                #Add general recommendations if no risk factor 
                if not recommendations: 
                    recommendations.append('Maintain a healthy lifestyle to keep risk low')
                    recommendations.append('Regular check-ups can help detect issues early')

                return { 
                    'disease': disease,
                    'base_risk': round(base_probability, 4), 
                    'adjusted_risk': round(risk, 4),
                    'base_risk_percent': round(base_probability * 100, 1),
                    'adjusted_risk_percent': round(risk * 100, 1), 
                    'severity': severity,
                    'factors': factors,
                    'recommendations': recommendations
                }
            
            def simulate_intervention(self, base_probability, current_lifestyle, disease, inverventions): 
                ''' 
                Simulate what happens when lifestyle factors are improved

                Returns: 
                dict with scenarios and risk reductions
                '''

                #Current risk 
                current = self.calculate_risk(base_probability, current_lifestyle, disease)

                #Create scenarios 
                scenarios = [{ 
                    'name': 'Current', 
                    'risk': current['adjusted_risk'],
                    'risk_percent': current['adjusted_risk_percent'],
                    'severity': current['severity'],
                }]


                #Simulate quitting smoking
                if current_lifestyle.get('smoking', False): 
                    new_lifestyle = current_lifestyle.copy()
                    new_lifestyle['smoking'] = False
                    result = self.calculate_risk(base_probability, new_lifestyle, disease)
                    scenarios.append({ 
                        'name': 'Quit Smoking',
                        'risk': result['adjusted_risk'],
                        'risk_percent': result['adjusted_risk_percent'],
                        'severity': result['severity'],
                        'reduction': round((current['adjusted_risk'] - result['adjusted_risk']) * 100, 1)

                    })

                    #Scenario: Improve sleep 
                    if current_lifestyle.get('sleep_hours', 7) < 7: 
                        new_lifestyle = current_lifestyle.copy()
                        new_lifestyle['sleep_hours'] = 8
                        result = self.calculate_risk(base_probability, new_lifestyle, disease)
                        scenarios.append({ 
                            'name': 'Improve Sleep to 8 hrs',
                            'risk': result['adjusted_risk'],
                            'risk_percent': result['adjusted_risk_percent'],
                            'severity': result['severity'],
                            'reduction': round((current['adjusted_risk'] - result['adjusted_risk']) * 100, 1)

                        })
                    
                    #Scenario: Reduce pollution exposure
                    if current_lifestyle.get('pollution_level', 'low') != 'low': 
                        new_lifestyle = current_lifestyle.copy() 
                        new_lifestyle['pollution_level'] = 'low' 
                        result = self.cauclaute_risk(base_probability, new_lifestyle, disease)
                        scenarios.append({ 
                            'name': 'Reduce Pollution', 
                            'risk': result['adjusted_risk'],
                            'risk_percent': result['adjusted_risk_percent'],
                            'severity': result['severity'],
                            'reduction': round((current['adjusted_risk'] - result['adjusted_risk']) * 100, 1)
                        })

                    #Scenario: All improvements 
                    if len(scenarios) > 1: 
                        optimal_lifestyle = { 
                            'smoking': False, 
                            'sleep_hours': 8, 
                            'pollution_level': 'low'
                        }

                    result = self.calculate_risk(base_probability, optimal_lifestyle, disease)
                    scenarios.append({ 
                        'name': 'All Improvements', 
                        'risk': result['adjusted_risk'], 
                        'risk_percent': result['adjusted_risk_percent'], 
                        'severity': result['severity'], 
                        'reduction': round((current['adjusted_risk'] - result['adjusted_risk']) * 100, 1) 
                    })

                    return { 
                        'scenarios': scenarios, 
                        'current_risk': current['adjusted_risk_percent'], 
                        'best_case_risk': scenarios[-1].get('reduction', 0) if len(scenarios) > 1 else 0 

                    }
                
                def _get_severity(self, risk): 
                    """ Determine severity level from risk score"""
                    if risk < 0.3: 
                        return 'Low'
                    elif risk < 0.5: 
                        return 'Moderate' 
                    elif risk < 0.7: 
                        return 'High'
                    else: 
                        return 'Critical' 
                    
                    