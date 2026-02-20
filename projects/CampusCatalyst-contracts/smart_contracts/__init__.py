"""
Campus Crowdfunding Platform - Smart Contracts Package

This package contains the Algorand smart contracts for the
Campus Crowdfunding Platform built with AlgoKit and Algorand Python.
"""

__version__ = "1.0.0"
__author__ = "Campus Catalyst Team"

# Export main contract for easy imports
from smart_contracts.campus_funding.contract import CampusFunding

__all__ = ["CampusFunding"]
